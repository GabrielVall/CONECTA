<?php
class SQLConexion{
    public $conexion;
    private $server='localhost'; // Nombre del serviodr
    private $usuario='utnc_conecta'; // Usuario del servidor
    private $clave='HG*+K1P_9n)2'; // Contraseña
    private $bd='utnc_conecta'; // Nombre de la base de datos
    
    public function conectar(){ // Conectamos a la base de datos
        $this->conexion=@new mysqli($this->server,$this->usuario,$this->clave,$this->bd);
        if ($this->conexion->connect_error) // Si la conexion falla 
            die('Error de Conexion :(');
        else
            $this->conexion->set_charset("utf8mb4");
    }

    //desconectarse a la DB
    public function desconectar(){
        $this->conexion->close();
    }

    //Ejecuta un query y retorna el resultado en un Array
    //Solo utilizar cuando el resultado del Query provenga de un Select
    //Ya sea un Select Directo o dentro de un SP
    public function selectData($QueryString){
        $this->conectar();
        $Resultado=$this->conexion->query($QueryString); //Ejecucion del Query
        $Datos=array(); //Declaracion Array donde almacenaremos nuestros datos
        $i=0;
        while($fila=$Resultado->fetch_array()){
            $Datos[$i]=$fila;
            $i++;
        }
        $this->desconectar();
        return $Datos;
    }

    //Para obtener el resultado de ejecutar un query que no devuelve datos, como Insert,Delete,Update.
    //Resultado retorna TRUE si el query se ejecuto correctamente.
    public function updateData($QueryString){
        $this->conectar();
            $Resultado=$this->conexion->query($QueryString);
            $this->desconectar();
        Return $Resultado;
    }

    // Al igual que el update data, sin embargo es necesario enviar un parametro llamado @_ID
    public function returnId($QueryString1){
        $this->conectar();
        $Resultado1=$this->conexion->query($QueryString1);
        $Resultado2=$this->conexion->query("SELECT @_ID as _ID;"); //Ejecucion del Query
        $Datos=array(); //Declaracion Array donde almacenaremos nuestros datos
        $i=0;

        while($fila=$Resultado2->fetch_array()){
            $Datos[$i]=$fila;
            $i++;
        }
        $this->desconectar();
        return $Datos;
    }

    //Escapa caracteres especiales en un string. Ayuda a prevenir inyecciones SQL

    public function escapar($string){
        $this->conectar();
        //Evalua si el argumento que se le pasa es un arreglo
        if(is_array($string)){
            $funcion = array($this->conexion,"real_escape_string"); // Si lo es, guarda en un arreglo el contexto y el nombre de la funci贸n real_escape_string
            $escapedArray = array_map($funcion,$string); // Le aplica dicha funci贸n a todo el arreglo
            return $escapedArray; // Retorna el arreglo ya escapado y sale de la funci贸n
        }
        // Si no es un arreglo, escapa el string y lo retorna
        $escapedString = $this->conexion->real_escape_string($string);
        $this->desconectar();
        return $escapedString;
    }

}
?>
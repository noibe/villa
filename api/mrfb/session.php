<?php
/**
 * Created by PhpStorm.
 * User: eduardo
 * Date: 15/03/15
 * Time: 12:07
 */

session_start();

$_SESSION['test'] = 42;
$test = 43;
echo $_SESSION['test'];

//session_destroy();

?>
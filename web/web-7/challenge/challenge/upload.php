<?php
$target_dir = "uploads/";
$target_file = $target_file . basename($_FILES["fileToUpload"]["name"]);
echo $_FILES['fileToUpload']['name'];
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

// Allow certain file formats
/* if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" */
/* && $imageFileType != "gif" ) { */
/*     echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed."; */
/*     echo '<br>'; */
/*     $uploadOk = 0; */
/* } */
if ($uploadOk != 0) {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>

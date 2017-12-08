<?php /* Template Name: request-a-quote */ ?>
<?php get_header(); ?>
<script src="https://use.typekit.net/jzc6tqc.js"></script>
<script>try{Typekit.load({ async: true });}catch(e){}</script>

<div id="overlay">
    <?php
 
        if($_POST){
            if ( ! function_exists( 'wp_handle_upload' ) ) {
                require_once( ABSPATH . 'wp-admin/includes/file.php' );
            }

            $client_firstname = filter_var($_POST["FNAME"], FILTER_SANITIZE_STRING);
            $client_lastname = filter_var($_POST["LNAME"], FILTER_SANITIZE_STRING);
            $client_email = filter_var($_POST["EMAIL"], FILTER_SANITIZE_STRING);
            $client_phone = filter_var($_POST["PHONE"], FILTER_SANITIZE_NUMBER_INT );
            // $file_url = filter_var($_POST["URL"], FILTER_SANITIZE_STRING);

            if(strlen($client_firstname) == 0 || strlen($client_lastname) == 0){
                print json_encode(array('type'=>'error', 'text' => 'Name is too short or empty!'));
                exit;
            }

            if(!filter_var($client_email, FILTER_VALIDATE_EMAIL)){ //email validation
                print json_encode(array('type'=>'error', 'text' => 'Please enter a valid email!'));
                exit;
            }

            if(!$client_phone){ //check for valid numbers in phone number field
                print json_encode(array('type'=>'error', 'text' => 'Enter only digits in phone number'));
                exit;
            }

            $message_subject = "Quote request from $client_firstname";
            $message_body = "First Name: $client_firstname \n";
            $message_body .= "Last Name: $client_lastname \n";
            $message_body .= "Email: $client_email \n";
            $message_body .= "Phone: $client_phone \n";
            

            $files_array = array();

            foreach(range(0,count($_FILES)) as $count){

                if(isset($_FILES['stl_file_' . $count])){

                    $uploadedfile = $_FILES['stl_file_' . $count];
                    $upload_overrides = array( 'test_form' => false, 'action' => '' );

                    $movefile = wp_handle_upload( $uploadedfile, $upload_overrides );
                    $file_url = $_POST['stl_url_' . $count];
                    if ( $movefile && ! isset( $movefile['error'] ) ) {

                        $fields_are_set = 
                            isset($_FILES['stl_file_' . $count]) && 
                            isset($_FILES['stl_file_' . $count]) && 
                            isset($_POST['stl_material_' . $count]) && 
                            isset($_POST['stl_description_' . $count]) && 
                            isset($_POST['stl_url_' . $count]);

                        if(!$fields_are_set){
                            print json_encode(array('type'=>'error', 'text' => 'Not all file details are set.'));
                            exit;}

                        $file_name = filter_var($_FILES['stl_file_' . $count]['name']);
                        $file_technology = filter_var($_POST['stl_technology_' . $count]);
                        $file_material = filter_var($_POST['stl_material_' . $count]);
                        $file_description = filter_var($_POST['stl_description_' . $count]);
                        
                        $file_quantity = filter_var($_POST['stl_quantity_' . $count]);
                        

                        $message_body .= "--------------------------------------- \n";
                        $message_body .= "File $count : \n";
                        $message_body .= "Filename: $file_name \n";
                        $message_body .= "Technology: $file_technology \n";
                        $message_body .= "Material: $file_material \n";
                        $message_body .= "Description: $file_description \n";
                        // $message_body .= "Date: $file_date \n";
                        $message_body .= "Quantity: $file_quantity \n";

                        array_push($files_array, $movefile['file']);

                    } elseif (isset($file_url)) {
                        $file_technology = filter_var($_POST['stl_technology_' . $count]);
                        $file_material = filter_var($_POST['stl_material_' . $count]);
                        $file_description = filter_var($_POST['stl_description_' . $count]);
                        $file_date = $_POST['stl_date_' . $count];

                        $message_body .= "--------------------------------------- \n";
                        $message_body .= "File $count : \n";
                        $message_body .= "Technology: $file_technology \n";
                        $message_body .= "Material: $file_material \n";
                        $message_body .= "Description: $file_description \n";
                        // $message_body .= "Date: $file_date \n";
                        $message_body .= "URL: $file_url \n";
                    } else {
                        /**
                         * Error generated by _wp_handle_upload()
                         * @see _wp_handle_upload() in wp-admin/includes/file.php
                         */
                        print json_encode(array('type'=>'error', 'text' =>  $movefile['error']));
                        exit;
                    }

                }

            }

            $to = 'patrick@forgelabs.ca';
            // $to = 'tuan@pivotandpilot.com';
            $subject = $message_subject;
            $message =  $message_body;
            $attachments = $files_array;
            $headers = '';

            wp_mail($to, $subject, $message, $headers, $attachments);

            if(wp_mail($to, $subject, $message, $headers, $attachments)){
                // echo "<p>" . $message_body . "</p>";
                
                // echo "<div>" . get_template_part('templates/form', 'afterSubmit') . "</div>"; 
                echo    '<div class="after-submit-wrap">
                            <div class="close-icon-wrap">
                                <div class="close-icon"></div>
                            </div>
                            <div class="content">
                                <h1>Thank You for Your Submission</h1>
                                <h3>One of our experts will get back to you shortly</h3>
                                <div class="go-back-to-website">
                                    <a href="http://forgelabs.ca/">GO BACK TO WEBSITE</a>
                                </div>
                            </div>
                        </div>'; 
            } else {
                echo '<div> mail sent unsuccessfully </div>';
            }
    
            foreach($files_array as $file){
                unlink($file);
            }

        }
        
    ?>
    <div class="loader">
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
    </div>
   
    <div class="l-container">

        <div id="quoter_form">
            <div class="x-wrap">
                <a href="http://forgelabs.ca/"><button class="x"></button></a>
            </div>
            <header>
            
                <nav class="nav-form">
                    <button class="button-default s-active">1<span> : Upload File</span></button>
                    <button class="button-default">2<span> : Choose Technology</span></button>
                    <button class="button-default" id='page-3-button'>3<span> : Choose Material</span></button>
                    <button class="button-default" id='page-4-button'>4<span> : More Info</span></button>
                    <button class="button-default" id='page-5-button'>5<span> : Overview</span></button>
                </nav>

                <nav class="nav-files"></nav> 

            </header>

            <main>

                <div class="view">

                    <?php echo get_template_part('templates/form', 'upload'); ?>
                    <?php echo get_template_part('templates/form', 'technologies'); ?>
                    <?php echo get_template_part('templates/form', 'materials'); ?>
                    <?php echo get_template_part('templates/form', 'clientdata'); ?>
                    <?php echo get_template_part('templates/form', 'overview'); ?>

                </div>


                <div class="controller"> 
                    <button class="button-default button-arrow prev"><i class="fa fa-arrow-left fa-3x arrow-icon" aria-hidden="true"></i></button>
                    <button class="button-default button-arrow next"><i class="fa fa-arrow-right fa-3x arrow-icon" aria-hidden="true"></i></button>
                </div>

            </main>

        </div>

    </div>

    <footer>

        <div class="l-container">

            <p>For material questions &amp; urgent request, please contact:<br><a>sales@forgelabs.ca</a> or call us at <a>604.259.1399</a></p>

        </div>

    </footer>

    <div class="l-container">

        <form id="quoter_hidden_form" action="" method="post" enctype="multipart/form-data">

            <input type="submit" id="hiddenSubmitButton">
            <input type="text" name="FNAME"/>First Name<br>
            <input type="text" name="LNAME"/>Last Name<br>
            <input type="email" name="EMAIL"/>Email<br>
            <input type="tel" name="PHONE"/>Phone<br>
            <!-- <input type="url" name="URL">URL<br> -->

            <div class="part">
                <input type="file" id="stl_file_0" name="stl_file_0">
                <input type="radio" name="stl_technology_0" value="polyjet_matrix"/>
                <input type="radio" name="stl_technology_0" value="stereolithography"/>
                <input type="radio" name="stl_technology_0" value="fused_deposition_modeling"/>
                <input type="radio" name="stl_technology_0" value="selective_laser_sintering"/>
                <input type="radio" name="stl_technology_0" value="colour_jet_printing"/>
                <input type="radio" name="stl_technology_0" value="metal_printing"/>
                
                <?php $material_values = array(
                    'verowhite', 'veroclear', 'tangoblackagilus30', 'digitalabs', 'hightempurature(rgd525)', 'simulatedpolypropylene(rigur)', 'accuraxtremewhite(abs-like)', 'accura25(polypropylene-like)', 'accuraclearvue(transparent)', 
                    'absasa', 'nylon-12', 'polycarbonate', 'ultem9085', 'pc-abs', 'nylon-12cf', 'pc-iso', 'ultem1010', 'duraformpa(nylon)', 'duraformgf(glassfillednylon)', 'visijet-pxl'
                ); ?>
                
                <?php foreach($material_values as $value) : ?>
                    <input type="radio" name="stl_material_0" value="<?php echo $value; ?>"/>
                <?php endforeach; ?>
                
                Description: <input type="text" name="stl_description_0"/>
                Date: <input type="date" name="stl_date_0"/>
                Quantity: <input type="number" name="stl_quantity_0"/>
                URL: <input type="text" name="stl_url_0"/>
                URL output: <input class="output" type="text" name="stl_url_0"/>
            </div>

        </form>
        
    </div>

</div>

<?php get_footer(); ?>
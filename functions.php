<?php

// =============================================================================
// FUNCTIONS.PHP
// -----------------------------------------------------------------------------
// Theme functions for X.
// =============================================================================

// =============================================================================
// TABLE OF CONTENTS
// -----------------------------------------------------------------------------
//   01. Set Paths
//   02. Require Files
// =============================================================================

// Set Paths
// =============================================================================

$func_path = 'framework/functions';
$glob_path = 'framework/functions/global';
$admn_path = 'framework/functions/global/admin';
$eque_path = 'framework/functions/global/enqueue';
$plgn_path = 'framework/functions/global/plugins';



// Require Files
// =============================================================================


//
// Debugging, conditionals, helpers, and stack data.
//

require_once( $glob_path . '/debug.php' );
require_once( $glob_path . '/conditionals.php' );
require_once( $glob_path . '/helper.php' );
require_once( $glob_path . '/stack-data.php' );
require_once( $glob_path . '/tco-setup.php' );


//
// Admin.
//

require_once( $admn_path . '/thumbnails/setup.php' );
require_once( $admn_path . '/setup.php' );
require_once( $admn_path . '/migration.php' );
require_once( $admn_path . '/meta/setup.php' );
require_once( $admn_path . '/sidebars.php' );
require_once( $admn_path . '/widgets.php' );
require_once( $admn_path . '/custom-post-types.php' );
require_once( $admn_path . '/customizer/setup.php' );
require_once( $admn_path . '/addons/setup.php' );


//
// Enqueue styles and scripts.
//

require_once( $eque_path . '/styles.php' );
require_once( $eque_path . '/scripts.php' );


//
// Global functions.
//

require_once( $glob_path . '/meta.php' );
require_once( $glob_path . '/featured.php' );
require_once( $glob_path . '/pagination.php' );
require_once( $glob_path . '/navbar.php' );
require_once( $glob_path . '/breadcrumbs.php' );
require_once( $glob_path . '/classes.php' );
require_once( $glob_path . '/portfolio.php' );
require_once( $glob_path . '/social.php' );
require_once( $glob_path . '/content.php' );
require_once( $glob_path . '/remove.php' );


//
// Stack specific functions.
//

require_once( $func_path . '/integrity.php' );
require_once( $func_path . '/renew.php' );
require_once( $func_path . '/icon.php' );
require_once( $func_path . '/ethos.php' );


//
// Integrated plugins.
//

require_once( $plgn_path . '/cornerstone.php' );

if ( X_BBPRESS_IS_ACTIVE ) {
  require_once( $plgn_path . '/bbpress.php' );
}

if ( X_BUDDYPRESS_IS_ACTIVE ) {
  require_once( $plgn_path . '/buddypress.php' );
}

if ( X_CONVERTPLUG_IS_ACTIVE ) {
  require_once( $plgn_path . '/convertplug.php' );
}

if ( X_ENVIRA_GALLERY_IS_ACTIVE ) {
  require_once( $plgn_path . '/envira-gallery.php' );
}

if ( X_ESSENTIAL_GRID_IS_ACTIVE ) {
  require_once( $plgn_path . '/essential-grid.php' );
}

if ( X_LAYERSLIDER_IS_ACTIVE ) {
  require_once( $plgn_path . '/layerslider.php' );
}

if ( X_REVOLUTION_SLIDER_IS_ACTIVE ) {
  require_once( $plgn_path . '/revolution-slider.php' );
}

if ( X_SOLILOQUY_IS_ACTIVE ) {
  require_once( $plgn_path . '/soliloquy.php' );
}

if ( X_VISUAL_COMOPSER_IS_ACTIVE ) {
  require_once( $plgn_path . '/visual-composer.php' );
}

if ( X_WOOCOMMERCE_IS_ACTIVE ) {
  require_once( $plgn_path . '/woocommerce.php' );
}

if ( X_WPML_IS_ACTIVE ) {
  require_once( $plgn_path . '/wpml.php' );
}

if ( X_UBERMENU_IS_ACTIVE ) {
  require_once( $plgn_path . '/ubermenu.php' );
}

if ( X_THE_GRID_IS_ACTIVE && x_is_validated() ) {
	require_once( $plgn_path . '/the-grid.php' );
}

if ( X_EP_PAYMENT_FORM_IS_ACTIVE ) {
	require_once $plgn_path . '/estimation-form.php';
}



// Request a quote files
add_filter( 'x_enqueue_parent_stylesheet', '__return_true' );



// Additional Functions
// =============================================================================

function x_child_enqueue_child_stylesheet(){
    wp_enqueue_style( 'x-style-original', get_stylesheet_directory_uri() . '/style.css' );
    if(is_page('request-new-quote')){
        wp_enqueue_style( 'x-style-overrides', get_stylesheet_directory_uri() . '/style-overrides.css' );

        wp_enqueue_style( 'x-style-technology', get_stylesheet_directory_uri() . '/style-technology.css' );
        wp_enqueue_script( 'x-child-forgelabs-materials-about', get_stylesheet_directory_uri() . '/inc/materials-about.js');
        wp_enqueue_script( 'x-child-forgelabs-materials-data', get_stylesheet_directory_uri() . '/inc/materials-data.js');        

        wp_enqueue_style( 'x-style-uploads', get_stylesheet_directory_uri() . '/upload.css' );
        wp_enqueue_script( 'x-child-forgelabs-upload', get_stylesheet_directory_uri() . '/inc/upload.js', array('jquery'), true );

        

//         // wp_enqueue_style( 'jquery', get_stylesheet_directory_uri() . 'https://code.jquery.com/jquery-3.2.1.min.js' );

//         // slick css and js
//         wp_enqueue_style( 'slick-css', get_stylesheet_directory_uri() . '/framework/slick-1.8.0/slick/slick.css' );
//         wp_enqueue_style( 'slick-theme-css', get_stylesheet_directory_uri() . '/framework/slick-1.8.0/slick/slick-theme.css' );
//         wp_enqueue_script( 'slick-js', get_stylesheet_directory_uri() . '/framework/slick-1.8.0/slick/slick.min.js', array(), '', true );

        wp_enqueue_script( 'x-child-forgelabs-tab', get_stylesheet_directory_uri() . '/inc/class-Tab.js', array(), '', true );
        wp_enqueue_script( 'x-child-forgelabs-form-controller', get_stylesheet_directory_uri() . '/inc/class-FormController.js', array('jquery', 'x-child-forgelabs-tab'), '', true );
//         // wp_enqueue_script( 'x-child-forgelabs-form', get_stylesheet_directory_uri() . '/index.js', array('jquery', 'x-child-forgelabs-tab'), '', true );

//         // page 5 css and js
        wp_enqueue_script( 'page5-js', get_stylesheet_directory_uri() . '/inc/page5.js', array('jquery', 'x-child-forgelabs-tab'), '', true );
        wp_enqueue_style( 'page5-css', get_stylesheet_directory_uri() . '/page5.css' );

    }


    // Enqueue Font Awesome for menu icons always
    wp_enqueue_script( 'font-awesome-cdn', 'https://use.fontawesome.com/affc2627e0.js', array(),'4.7.0');
}

add_action('wp_enqueue_scripts', 'x_child_enqueue_child_stylesheet');

function my_mime_types($mime_types){
    $mime_types['stl'] = 'application/sla'; //Adding svg extension
    return $mime_types;
}
add_filter('upload_mimes', 'my_mime_types', 1, 1);
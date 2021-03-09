<?php
/*
Plugin Name: WooCommerce Checkout Field Save
Plugin URI: https://hollerwp.com
Description: Save WooCommerce Checkout fields so they persist on a refresh or error.
Version: 0.0.1
Author: Scott Bolinger
Author URI: https://hollerwp.com
*/

add_action( 'wp_enqueue_scripts', 'sb_woo_scripts' );

// add our scripts and styles
function sb_woo_scripts() {

    // Bail if not on checkout page
    if( !is_checkout() )
        return;
    
    wp_enqueue_script( 'sb-save-fields', plugins_url( "assets/sb-save-fields.js", __FILE__ ), array( 'jquery' ), '0.0.1', true );

}
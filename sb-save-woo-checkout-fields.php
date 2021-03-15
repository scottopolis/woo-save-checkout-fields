<?php
/*
Plugin Name: WooCommerce Checkout Field Save
Plugin URI: https://hollerwp.com/save-woocommerce-checkout-form-values/
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

    wp_localize_script( 'sb-save-fields', 'sbSettings', array(
        'root' => esc_url_raw( rest_url() ),
        'nonce' => wp_create_nonce( 'sb-woo-custom' )
    ) );

}

require_once( plugin_dir_path( __FILE__ ) . 'inc/endpoints.php' );

// make email the first field
add_filter( 'woocommerce_checkout_fields', 'sb_edit_checkout_fields' );

function sb_edit_checkout_fields( $fields ) {

    // make email first
    $fields['billing']['billing_email']['priority'] = 4;
	return $fields;

}
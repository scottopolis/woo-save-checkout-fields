<?php

add_action('rest_api_init', 'sb_woo_endpoints' );

function sb_woo_endpoints() {
    register_rest_route( 'sb', '/woo-custom', array(
        'methods' => 'POST',
        'callback' => 'sb_save_email',
        'permission_callback' => 'sb_verify_nonce'
    ) );
}

function sb_save_email( $request ) {
    // use this action to save the email to your abandoned cart flow
    do_action('sb_woo_email', $request['email'], $request );
    return $request['email'];
}

function sb_verify_nonce( $request ) {

    $nonce  = $request->get_header('nonce');

    if ( $nonce === 'sb-woo-custom' ) {
        return true;
    }

    return false;

}
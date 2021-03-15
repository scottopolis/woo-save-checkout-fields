(function(window, document, $, undefined){

    const sbWoo = {};

    sbWoo.init = function() {
        sbWoo.checkStorage()
        sbWoo.saveEmailListener();
    }

    sbWoo.saveEmailListener = function() {
        $('#billing_email').on('blur', function(e) {
            let email = e.target.value;
            if( email && email.indexOf('@') > 0 && email.indexOf('.') > 0 ) {
                sbWoo.sendEmail( email );
                return;
            }
        });
    }

    // first we autofill the form with saved values, if they exist
    sbWoo.checkStorage = function() {

        // get values from storage
        let formValues = window.localStorage.getItem('sb_woo_form');
        if( formValues && JSON.parse( formValues ) ) {
            formValues = JSON.parse( formValues );
            
            for (const name in formValues) {
                const value = formValues[name];
                if( value && name ) {
                    // loop over saved values and fill in the corresponding form input
                    let $input = $('input[name=' + name + ']');
                    if( $input.length ) {
                        
                        // radio buttons are handled differently than other inputs
                        if( $input.attr('type') === 'radio' ) {
                            $input.filter('[value="' + value + '"]').attr('checked', true);
                        } else {
                            $input.val( value );
                        }
                        
                    }
                }
                
            }
        }

        // listen for new changes
        sbWoo.startListener();

    }

    // listen for form changes and save values as needed
    sbWoo.startListener = function() {
        const $form = $('form.woocommerce-checkout');
        $form.change( event => {
            let wooForm = {};
            $('form.woocommerce-checkout :input').each(function() {

                if( !$(this)[0] ) return;

                // don't save hidden or CC inputs
                if( $(this)[0].type === 'hidden' || $(this)[0].classList.contains('__PrivateStripeElement-input') || $(this)[0].autocomplete === 'cc-number' ) {
                    return;
                }

                let name = ( $(this)[0] ? $(this)[0].name : null );
                if( !name ) return;

                let value = $(this).val();

                // radio buttons are handled differently
                if( $(this)[0].type === 'radio' ) {
                    
                    if( !$(this).is(":checked") ) {
                        return;
                    }
                }

                if( value ) {
                    wooForm[name] = value;
                }

            });

            // save all values to browser storage on each change
            window.localStorage.setItem('sb_woo_form', JSON.stringify( wooForm ));
        });
    }

    sbWoo.sendEmail = function( email ) {

        $.ajax( {
            url: sbSettings.root + 'sb/woo-custom',
            method: 'POST',
            beforeSend: function ( xhr ) {
                xhr.setRequestHeader( 'nonce', "sb-woo-custom" );
            },
            data:{
                'email' : email
            }
        } ).done( function ( response ) {
            console.log( response );
        } ).error( function( err ) {
            console.warn(err.responseText);
        });
    }

    sbWoo.init();

})(window, document, jQuery);
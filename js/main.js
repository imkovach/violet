$(function () {
    'use strict';

    let scrollPos = $(window).scrollTop();
    if (scrollPos > 0) {
        $('.navbar').addClass('navbar-overlay');
    } else {
        $('.navbar').removeClass('navbar-overlay');
    }

    $('[data-toggle="offcanvas"]').on('click', function () {
        if ($('body').hasClass('offcanvas-open')){
            $('body').removeClass('offcanvas-open');
            $('.offcanvas-collapse').removeClass('open');
        }else {
            $('body').addClass('offcanvas-open');
            $('.offcanvas-collapse').addClass('open');
        }
    });

    $('[data-toggle="offcanvas-close"]').on('click', function () {
        $('.offcanvas-collapse').removeClass('open');
        $('body').removeClass('offcanvas-open');
    });

    $(document).on('click', function (e) {
        if ($('body').hasClass('offcanvas-open')) {
            if (!$(e.target).closest('.navbar').length) {
                $('.offcanvas-collapse').removeClass('open');
                $('body').removeClass('offcanvas-open');
            }
        }
    });

    $('.nav-link').on('click', function () {
        if ($('body').hasClass('offcanvas-open')) {
            $('.offcanvas-collapse').removeClass('open');
            $('body').removeClass('offcanvas-open');
        }
    });

    $(window).on("scroll", function() {
        let scrollPos = $(window).scrollTop();
        if (scrollPos > 0) {
            $('.navbar').addClass('navbar-overlay');
        } else {
            $('.navbar').removeClass('navbar-overlay');
        }
    });

    // https://mdbootstrap.com/docs/jquery/forms/validation/

    $("#message-form").on("submit", function (event) {

        if (this.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (event.isDefaultPrevented()) {
            shakeForm();
            showSubmitMessage(false, "Пожалуйста, укажите Ваше имя и e-mail.");
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }

    });

    function submitForm(){

        // let name = $('#name').val();
        // let email = $('#email').val();
        // let phone = $('#phone').val();
        // let subject = $('#subject').val();
        // let message = $('#message').val();

        const messageForm = $("#message-form");
        console.log(messageForm);

        $.ajax({
            type: "POST",
            url: "php/send-message.php",
            // data: "name=" + name + "&email=" + email + "&message=" + message,
            data: messageForm.serialize(),
            success : function(text){
                let messageForm = $("#message-form");
                if (text === "success"){
                    messageForm[0].reset();
                    messageForm.removeClass('was-validated').addClass('needs-validation');
                    showSubmitMessage(true, "Ваше сообщение успешно отправлено!")
                    // let popup = $('#sent-message');
                    // let msgClasses = "h3 text-center animated text-info";
                    // popup.addClass(msgClasses).text("Ваше сообщение успешно отправлено!").fadeIn(200).delay(2000).fadeOut(1000);
                } else {
                    shakeForm();
                    //showSubmitMessage(false, text);
                }
            }
        });

        // axios.post('php/send-message.php', $('#message-form').serialize())
        //     .then(response => {
        //         if (response.text === "success") {
        //             messageForm[0].reset();
        //             messageForm.removeClass('was-validated').addClass('needs-validation');
        //             showSubmitMessage(true, "Ваше сообщение успешно отправлено!")
        //             // const popup = $('#sent-message');
        //             // const msgClasses = "h3 text-center animated text-info";
        //             // popup.addClass(msgClasses).text("Ваше сообщение успешно отправлено!").fadeIn(200).delay(2000).fadeOut(1000);
        //         } else {
        //             shakeForm();
        //             //showSubmitMessage(false, text);
        //         }
        //     });
    }

    function shakeForm(){
        $("#message-form").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass().addClass('was-validated');
        });
    }

    function showSubmitMessage(valid, msg){
        let msgClasses;
        let messageBlock = $('#sent-message');
        if(valid){
            msgClasses = "h3 text-center animated text-white";
            messageBlock.removeClass().addClass(msgClasses).text(msg).fadeIn(200).delay(2000).fadeOut(1000);
        } else {
            msgClasses = "h3 text-center text-warning";
            messageBlock.removeClass().addClass(msgClasses).text(msg).fadeIn(200);
        }
    }

});
<?php
/**
* The template for the footer.
*
*
*/
?>
<?php /**/ ?>
<?php /*Breadcrumb section*/ ?>
<section class="sect_breadcrumb">
      <div class="wrapper">
          <div class="grid">
            <div class="grid__item one-whole">
              <div class="breadcrumbs">
                  <?php /*display the breadcrumb*/ ?>
                  <?php if ( function_exists('yoast_breadcrumb') ) {
                  yoast_breadcrumb();
                  } ?>
              </div>
            </div>
          </div>
      </div>
</section>
<?php /*subsribe newsletter*/ ?>
<section class="sect_foot">
      <div class="wrapper">
          <div class="grid">
            <div class="grid__item one-half palm-one-whole">
              <div class="island">
                  <h4 class="h_footer">Stay updated</h4>
                  <p class="p_footer">We will provide you with information about new products and updates.<br></p>
                  <!-- <input type="text" value="" placeholder="Enter your email address (we won't send you any spam!)" class="form-control">
                  <a href="#" class="btn btn--newsletter">Sign-up for our newsletter</span></a>  -->
                  <!-- Begin MailChimp Signup Form -->
                  <div id="mc_embed_signup">
                    <form action="http://sapiens.us4.list-manage2.com/subscribe/post?u=8d41b60709140a6785f6d82ab&amp;id=27bc1bddc0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                      <div class="mc-field-group">
                          <input type="email" value="" placeholder="Enter your email address (we won't send you any spam!)" name="EMAIL" class="form-control" id="mce-EMAIL">
                      </div>
                      <div id="mce-responses" class="clear">
                          <div class="response" id="mce-error-response" style="display:none"></div>
                          <div class="response" id="mce-success-response" style="display:none"></div>
                      </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                      <div style="position: absolute; left: -5000px;"><input type="text" name="b_8d41b60709140a6785f6d82ab_27bc1bddc0" value=""></div>
                      <div class="clear"><input type="submit" value="Sign-Up for our Newsletter" name="subscribe" id="mc-embedded-subscribe" class="button btn btn--newsletter"></div>
                    </form>
                  </div>
                  <!--End mc_embed_signup-->
              </div>
            </div><?php /*contact information*/ ?><div class="grid__item one-half palm-one-whole">
              <div class="island">
                <h4 class="h_footer">Need help? Contact us!</h4>
                <p class="p_footer">If you have any questions about our products or services, let us know.</p>
                <p class="p_footer_strong"><strong>email: <a href="mailto:support@sapiens.at">support@sapiens.at</a></strong></p>
                <p class="p_footer_strong"><strong>or call us: +43 1 236 19 03 - 0</strong> <small>(9AM-6PM CET)</small></p>
                <!--<p class="p_footer"><small>* our office hours Mon - Fri 9AM - 6PM (CET)</small></p>-->
              </div>
            </div>
          </div>
      </div>
</section>
<section class="legal">
      <div class="wrapper">
          <div class="grid">
            <div class="grid__item one-whole">
                <p class="p_legal"><a href="legal-notice/terms-use/">Terms of Use</a> | <a href="legal-notice/privacy-statement/">Privacy Statement</a> | <a href="legal-notice/">Legal Notice</a> ‎</p>
            </div>
          </div>
      </div>
</section>
<?php get_template_part("basicfooter"); ?>
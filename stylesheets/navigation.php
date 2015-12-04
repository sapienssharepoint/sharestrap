<?php

/* 
 * The main navigation
 */
?>
<?php $productKey = sharestrap_get_product_key(); ?>
<section id="nav" class="header<? if(has_nav_menu('secondary-menu' . $productKey)){ echo " has-second-menu"; } ?>">
  <div class="wrapper">
    <div class="grid">
         <div class="grid__item  one-half  palm-one-whole">
            <?php get_template_part("logo"); ?>
         </div><div class="grid__item  one-half palm-one-whole">
                <!--main navigation-->
                <ul class="nav  nav--main nav--block ">
                  <li class="flyout" aria-haspopup="true"><a class="arrow_down">Products<b class="caret"></b></a>
                    <div class="flyout__content" aria-haspopup="false">
                      <ul>
                        <li><a class="a-evm" href="/event-management/">Event Management</a></li>
                        <li><a class="a-lfwp" href="/list-filter-web-part/">List Filter Web Part</a></li>
                        <li><a class="a-cee" href="/calendar-email-extension/">Calendar E-Mail Extension</a></li>
                        <li><a class="a-etm" href="/employee-training-management/">Employee Training Management</a></li>
                        <li><a class="a-ett" href="/project-management-and-time-tracking/">Project Management and Time Tracking</a></li>
                        <li><a class="a-lp" href="/enhanced-lookup/">Enhanced Lookup</a></li>
                        <li><a class="a-bdc" href="/sql-business-data-connector/">SQL Business Data Connector</a></li>
<!--                        <li class="li-jfc"><a href="">JotForm Connector</a></li>
                        <li class="li-sql"><a href="">SQL Data Matcher</a></li>-->
                      </ul>
		    <ul>
                        <li><a class="a-evm" href="/event-management/">Event Management</a></li>
                        <li><a class="a-cee" href="/calendar-email-extension/">Calendar E-Mail Extension</a></li>
                        <li><a class="a-etm" href="/employee-training-management/">Employee Training Management</a></li>
                      </ul>
                    </div>
                  </li>
                  <li class="<?php get_nav_item_selected(__("blog")); ?>" ><a href="/blog/">Blog</a></li>
                  <li class="<?php get_nav_item_selected(__("who-we-are"));  ?>"><a href="/who-we-are/">Who we are</a></li>
<!--                  <li><a href=#></a></li>-->
              </ul>      
             <?php 
//             wp_nav_menu( array( 
//                                'theme_location' => 'main-menu', 
//                                'container' => '', 
//                                'menu_class' => 'nav  nav--main nav--block ',
//                                'walker' =>  new sharestrap_walker_nav_menu()) ); 
             ?>
         </div>
     </div>
   </div>
</section>
<!--secondary navigation-->
<?php if(has_nav_menu('secondary-menu' . $productKey)):?>
<section id="nav_sub" class="sect-second<?php echo $productKey; ?>">
     <div class="wrapper">
          <div class="grid">
                        <div class="grid__item  one-whole">
                            <?php wp_nav_menu( array( 
                                'theme_location' => 'secondary-menu' . $productKey, 
                                'container' => '', 
                                'menu_class' => 'nav nav--second nav--block') ); ?>
            </div>     
          </div>
        </div>
</section>
<section class="nav-end sect-second-end"></section>
<?php else:?>
<section class="nav-end"></section>
<?php endif;?>
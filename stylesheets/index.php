<?php
/**
 * The index page
 *
 * Displays the title and excerpt of all blog posts
 *
 */
/* the title */
get_header(); ?>
<section class="sect_island" >
        <div class="wrapper blog-index">
            <div class="grid">
                <div class="grid__item seven-tenths  palm-one-whole">
                    <div class="island" >
                        <h1 class="description">Blog</h1>
                        <a href="<?php bloginfo('rss2_url'); ?>" title="<?php _e('Syndicate this site using RSS'); ?>"></a>
                    </div>
                </div>
            </div>
        </div>
  </section>
<?php if ( have_posts() ) : 
/* The loop */ 
$postCnt = 0;
while ( have_posts() ) : the_post();
$postCnt++; ?>
<section class="sect_island" <?php if($postCnt%2!=0) :?> style="background:#f0f0f0;" <?php endif; ?> >
        <div class="wrapper blog-index">
            <div class="grid">
                <div class="grid__item one-whole">
                    <div class="island" >
                        <?php sharestrap_category_list($false) ?>
                        <h3 class="description">
                            <a href="<?php the_permalink(); ?>"  rel="bookmark"><?php the_title(); ?></a>
                        </h3>
                        <?php sharestrap_entry_meta(); ?>
                        <div class=" description">
                          <?php the_excerpt(); ?>
                        </div>
                        <a class="continue-reading" href="<?php the_permalink(); ?>">Read more...</a>
                    </div>      
                </div>
            </div>
        </div>
</section>
<?php endwhile; ?>
<?php endif; ?>
<?php sharestrap_paging_nav("blog-index"); ?>
<?php get_footer(); ?>


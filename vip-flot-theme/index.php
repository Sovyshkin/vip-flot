<?php get_header(); ?>

<main class="galleryyachts-layout__main">
    <div class="galleryyachts-layout__container">
        <?php
        if (have_posts()) :
            while (have_posts()) :
                the_post();
                ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <h1 class="galleryyachts-page__title"><?php the_title(); ?></h1>
                    <div class="galleryyachts-page__content">
                        <?php the_content(); ?>
                    </div>
                </article>
                <?php
            endwhile;
        else :
            ?>
            <p>Контент не найден.</p>
        <?php endif; ?>
    </div>
</main>

<?php get_footer(); ?>

<?php

/**
 * @file
 * Post update functions for Bootstrap Barrio.
 */

/**
 * Sets the default toast widget delay of theme settings.
 */
function forcontu_bootstrap_post_update_add_toast_widget_delay(): void {
  \Drupal::configFactory()->getEditable('forcontu_bootstrap.settings')
    ->set('forcontu_bootstrap_messages_widget_toast_delay', 10000)
    ->save();
}

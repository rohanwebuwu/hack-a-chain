<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'word2' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'r/vV/qED[#iR%N,W{+H+YROc$MJ7-Reu]`SfRzyz#>DgdHmD$AMIAgvV|CKX73OY' );
define( 'SECURE_AUTH_KEY',  'a?@)p>iNXd+p|)/}6YD4zPk23Dhetmx-C%@3)v?j<<ya6;5cgeEC)c}y0*{vX},U' );
define( 'LOGGED_IN_KEY',    'Ur!+#Fz>AX(UtrP~J=ZuQD-D$=[#!8Y(I=^cS%K %+7Ak~DJ9EM+Voh5+0iE9GO;' );
define( 'NONCE_KEY',        ';jaB&g w{R?zrunMQlug-2/(86v$%M 4[_R#t?f&OUJ2<9O|bs(Hm#ZfYLZ]5Swi' );
define( 'AUTH_SALT',        'r:Z A9oeS$<lkC9y!&4CH-^s0M?5?@.v+n@3N~gIDL$%7dReL[6qUK@/`m-xf^cX' );
define( 'SECURE_AUTH_SALT', '^@-K$&iYb18O!mVnf6&jKG~5Q]sb>J%jCzD:n*xJs}Hqr`yXw44uzI*i~3cct)RY' );
define( 'LOGGED_IN_SALT',   'hk/kh;w;TWF];s~S~}xIG[|V&QG`@}SbQq^,9I36TnW{PJeFx`ZuU ~Za(w;s5[P' );
define( 'NONCE_SALT',       'jiGvF:@MDek*Lp8(6Z.B9v?o}s/Bq:7}KzJtFxrB|n>3]<s{~~E!6~7,?vg+m#l|' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
define( 'FS_METHOD', 'direct' );

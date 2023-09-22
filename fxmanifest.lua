fx_version 'bodacious'
games { 'gta5' }

author 'SpMex'
description 'Lockpick Circle Mini-Game'
version '1.0'

client_scripts {
    'client/*.lua',
}

ui_page {
    'html/index.html',
}

files {
    'html/index.html',
    'html/*.css',
    'html/*.js',
    'html/spacebar.png',

}


exports {
    "StartLockPickCircle"
}
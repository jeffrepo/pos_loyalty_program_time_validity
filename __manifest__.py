# -*- coding: utf-8 -*-
{
    "name": "POS Loyalty Program Time Validity",
    "summary": "Adds daily start/end hours to Odoo loyalty promotions in POS.",
    "version": "19.0.1.0.0",
    "category": "Point of Sale",
    "author": "Jefferson Silva / ChatGPT",
    "license": "LGPL-3",
    "depends": [
        "loyalty",
        "point_of_sale",
        "pos_loyalty",
    ],
    "data": [
        "views/loyalty_program_views.xml",
    ],
    "assets": {
        "point_of_sale._assets_pos": [
            "pos_loyalty_program_time_validity/static/src/js/time_validity.js",
            "pos_loyalty_program_time_validity/static/src/js/pos_order_patch.js",
            "pos_loyalty_program_time_validity/static/src/js/pos_store_patch.js",
        ],
    },
    "installable": True,
    "application": False,
}

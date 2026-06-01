/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PosOrder } from "@point_of_sale/app/models/pos_order";
import { isProgramValidByDateAndHour } from "@pos_loyalty_program_time_validity/js/time_validity";

const { DateTime } = luxon;

patch(PosOrder.prototype, {
    _programIsApplicable(program) {
        if (!super._programIsApplicable(...arguments)) {
            return false;
        }

        // Keep date validation and add daily time-window validation.
        return isProgramValidByDateAndHour(program, DateTime.now());
    },
});

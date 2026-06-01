/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PosStore } from "@point_of_sale/app/services/pos_store";
import { getProgramDateTimeInvalidMessage } from "@pos_loyalty_program_time_validity/js/time_validity";

const { DateTime } = luxon;

patch(PosStore.prototype, {
    async activateCode(code) {
        const order = this.getOrder();
        const rule = this.models["loyalty.rule"].find(
            (rule) =>
                rule.mode === "with_code" && (rule.promo_barcode === code || rule.code === code)
        );

        if (rule?.program_id) {
            const dateOrder = order?.date_order ? DateTime.fromSQL(order.date_order) : DateTime.now();
            const invalidMessage = getProgramDateTimeInvalidMessage(rule.program_id, dateOrder);
            if (invalidMessage) {
                return invalidMessage;
            }
        }

        return await super.activateCode(...arguments);
    },
});

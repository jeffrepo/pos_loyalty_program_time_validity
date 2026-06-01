# -*- coding: utf-8 -*-

from odoo import api, fields, models, _
from odoo.exceptions import ValidationError


class LoyaltyProgram(models.Model):
    _inherit = "loyalty.program"

    hour_from = fields.Float(
        string="Hora inicio",
        default=0.0,
        help="Hora desde la cual la promoción es válida cada día. Formato 24 horas.",
    )
    hour_to = fields.Float(
        string="Hora fin",
        default=lambda self: 23 + 59 / 60,
        help="Hora hasta la cual la promoción es válida cada día. Formato 24 horas.",
    )

    @api.constrains("hour_from", "hour_to")
    def _check_pos_loyalty_program_hours(self):
        for program in self:
            if not 0 <= program.hour_from < 24:
                raise ValidationError(_("La hora de inicio debe estar entre 00:00 y 23:59."))
            if not 0 <= program.hour_to < 24:
                raise ValidationError(_("La hora de fin debe estar entre 00:00 y 23:59."))

    @api.model
    def _load_pos_data_fields(self, config_id):
        """Make the new fields available in the POS frontend.

        Odoo's POS loads a reduced set of fields for each model. Without adding
        these fields here, the JS validation would receive undefined values.
        """
        fields_to_load = super()._load_pos_data_fields(config_id)
        return fields_to_load + [field for field in ["hour_from", "hour_to"] if field not in fields_to_load]

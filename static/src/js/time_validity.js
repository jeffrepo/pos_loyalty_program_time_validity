/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";

const { DateTime } = luxon;
const DEFAULT_HOUR_FROM = 0;
const DEFAULT_HOUR_TO = 23 + 59 / 60;

export function getFloatHour(dateTime) {
    return dateTime.hour + dateTime.minute / 60 + dateTime.second / 3600;
}

export function getProgramHourFrom(program) {
    return typeof program.hour_from === "number" ? program.hour_from : DEFAULT_HOUR_FROM;
}

export function getProgramHourTo(program) {
    return typeof program.hour_to === "number" ? program.hour_to : DEFAULT_HOUR_TO;
}

export function isProgramValidByDate(program, dateTime = DateTime.now()) {
    if (program.date_from && dateTime < program.date_from.startOf("day")) {
        return false;
    }
    if (program.date_to && dateTime > program.date_to.endOf("day")) {
        return false;
    }
    return true;
}

export function isProgramValidByHour(program, dateTime = DateTime.now()) {
    const hourFrom = getProgramHourFrom(program);
    const hourTo = getProgramHourTo(program);
    const currentHour = getFloatHour(dateTime);

    // Normal same-day window, for example 08:00 to 17:00.
    if (hourFrom <= hourTo) {
        return currentHour >= hourFrom && currentHour <= hourTo;
    }

    // Overnight window, for example 22:00 to 02:00.
    return currentHour >= hourFrom || currentHour <= hourTo;
}

export function isProgramValidByDateAndHour(program, dateTime = DateTime.now()) {
    return isProgramValidByDate(program, dateTime) && isProgramValidByHour(program, dateTime);
}

export function getProgramDateTimeInvalidMessage(program, dateTime = DateTime.now()) {
    if (program.date_from && dateTime < program.date_from.startOf("day")) {
        return _t("That promo code program is not yet valid.");
    }
    if (program.date_to && dateTime > program.date_to.endOf("day")) {
        return _t("That promo code program is expired.");
    }
    if (!isProgramValidByHour(program, dateTime)) {
        return _t("That promo code program is not valid at this time.");
    }
    return false;
}

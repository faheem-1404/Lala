import { BUSINESS } from "@/data/business";

export const whatsappLink = (message: string = BUSINESS.whatsappMessage) =>
  `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const whatsappOrderLink = (itemName: string) =>
  whatsappLink(
    `Hello La La Paal Nilayam! I would like to order ${itemName}. Could you confirm the price and availability?`,
  );

export const telLink = () => `tel:${BUSINESS.phoneE164}`;
export const swiggyLink = () => BUSINESS.swiggyUrl;
export const instagramLink = () => BUSINESS.instagramUrl;
export const mapsLink = () => BUSINESS.mapsUrl;
export const justdialLink = () => BUSINESS.justdialUrl;

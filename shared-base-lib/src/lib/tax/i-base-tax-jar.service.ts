import { CalculateTaxPayload, CreateTaxOrderPayload, SalesTax, TaxAddressValidationStatus, TaxCategory, TaxOrder, TaxRate } from "./domain";
import { Address } from "../types";

export interface IBaseTaxJarService {
  calculateTaxAsync(payload: CalculateTaxPayload): Promise<SalesTax>;
  createOrderTransactionAsync(payload: CreateTaxOrderPayload): Promise<TaxOrder>;
  getTaxOrderByIdAsync(orderId: string): Promise<TaxOrder>;
  deleteTaxOrderByIdAsync(orderId: string): Promise<void>;
  validateAddressAsync(address: Address): Promise<TaxAddressValidationStatus>;
  listTaxCategoriesAsync(): Promise<TaxCategory[]>;
  getRatesByZipCodeAsync(zip: string): Promise<TaxRate>;
}

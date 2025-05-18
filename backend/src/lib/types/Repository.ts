export default abstract class Repository {
  /**
   * @description The model to be used in the repository
   * @example prisma.user
   */
  abstract model: unknown;

  /**
   * @description Find a record by its ID
   * @param id The ID of the record to find
   * @returns The record if found, null otherwise
   */
  abstract findById(id: string): Promise<unknown>;

  /**
   * @description Find all records
   * @returns An array of all records
   */
  abstract findAll(): Promise<unknown[]>;
}

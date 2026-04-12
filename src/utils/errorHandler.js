
/**
 * Define a custom Error handling class.
 * It extends the base Error class
 */
export class NetworkError extends Error {
    constructor(message) {
        super(message)
        this.name = "NetworkError"
    }
}
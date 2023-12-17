class APIFeatures {

    // Initialize APIFeatures with a Mongoose query object and the HTTP request's query string.
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    // Method to filter the query based on the query parameters.
    filter() {
        // Create a copy of the query string object to modify.
        let queryObj = { ...this.queryString };

        // Define fields that should not be used for filtering.
        const excludedFields = ['page', 'sort', 'limit', 'fields'];

        // Remove these fields from the query object.
        excludedFields.forEach(field => delete queryObj[field]);

        // Convert query parameters to MongoDB operators (e.g., 'price[gt]' to 'price: {$gt: 300}').
        let queryStr = JSON.stringify(queryObj)
            .replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        // Apply the filters to the query.
        this.query = this.query.find(JSON.parse(queryStr));

        return this; // Allow method chaining by returning the object instance.
    }

    // Method to sort the query results.
    sort() {
        if (this.queryString.sort) {
            // Convert sort criteria to a format MongoDB understands and apply it to the query.
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            // Default sorting by creation date if no sort parameter is provided.
            this.query = this.query.sort('-createdAt');
        }

        return this; // Allow method chaining.
    }

    // Method to limit the fields in the query results.
    limitFields() {
        if (this.queryString.fields) {
            // Convert fields to a format MongoDB understands and apply it to the query.
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            // Exclude the __v field by default (common in Mongoose schemas).
            this.query = this.query.select('-__v');
        }

        return this; // Allow method chaining.
    }

    // Method to paginate the query results.
    paginate() {
        // Set default values for page and limit, and calculate the number of documents to skip.
        const page = parseInt(this.queryString.page) || 1;
        const limit = parseInt(this.queryString.limit) || 4;
        const skip = (page - 1) * limit;

        // Apply pagination to the query.
        this.query = this.query.skip(skip).limit(limit);

        return this; // Allow method chaining.
    }

}

module.exports = APIFeatures;

import axios from 'axios';

const BASE_URL = 'http://localhost:8989/api';

// Visitor Data APIs

// Get all visitors
export const getAllVisitors = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/visitors`);
        console.log("Fetched Visitors:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching visitors:", error);
        throw error;
    }
};

// Get visitor by ID
export const getVisitorById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/visitors/${id}`);
        console.log(`Fetched Visitor ${id}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching visitor with id ${id}:`, error);
        throw error;
    }
};

// Create new visitor
export const createVisitor = async (visitorData) => {
    console.log("Sending request to create visitor with data:", visitorData);
    try {
        

        const response = await axios.post(`${BASE_URL}/visitors/register`, visitorData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log("Received response from server:", response);
        console.log("Created Visitor:", response.data);

        return response.data;
    } catch (error) {
        console.error("Error creating visitor:", error);

        // You can log specific error details to identify the issue
        if (error.response) {
            console.error("Response error details:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
        } else if (error.request) {
            console.error("No response received. Request details:", error.request);
        } else {
            console.error("Error setting up the request:", error.message);
        }

        throw error;
    }
};




// Update visitor by ID
export const updateVisitor = async (id, visitorData) => {
    try {
        const response = await axios.put(`${BASE_URL}/visitors/${id}`, visitorData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(`Updated Visitor ${id}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error updating visitor with id ${id}:`, error);
        throw error;
    }
};

// Delete visitor by ID
export const deleteVisitor = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/visitors/${id}`);
        console.log(`Deleted Visitor ${id}`);
    } catch (error) {
        console.error(`Error deleting visitor with id ${id}:`, error);
        throw error;
    }
};

// Get visitor by email
export const getVisitorByEmail = async (email) => {
    try {
        const response = await axios.get(`${BASE_URL}/visitors/email/${email}`);
        console.log(`Fetched Visitor with email ${email}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching visitor with email ${email}:`, error);
        throw error;
    }
};

// Verify visitor email
export const verifyVisitorEmail = async (email) => {
    try {
        const response = await axios.post(`${BASE_URL}/visitors/verify-email`, { email }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(`Verified email for Visitor:`, response.data);
        return response.data;
    } catch (error) {
        console.error("Error verifying visitor email:", error);
        throw error;
    }
};

// Check duplicate visitors by email
export const checkDuplicateVisitors = async (email) => {
    try {
        const response = await axios.get(`${BASE_URL}/visitors/${email}`);
        console.log(`Checked duplicates for email ${email}:`, response.data);
        return response.data;
    } catch (error) {
        console.error("Error checking duplicate visitors:", error);
        throw error;
    }
};

// Update visitor's password
export const updateVisitorPassword = async (id, passwordData) => {
    try {
        const response = await axios.put(`${BASE_URL}/visitors/${id}/password`, passwordData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(`Updated password for Visitor ${id}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error updating password for visitor ${id}:`, error);
        throw error;
    }
};

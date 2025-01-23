export const validateSingleName = (name: string): boolean => {
    if (typeof name !== "string" || name.trim().length === 0) {
        throw new Error("Name must be a non-empty string.");
    }
    // Check if the name has at least two characters
    if (name.trim().length < 2) {
        throw new Error("Name must be at least two characters long.");
    }
    // Regular expression to validate single names (only alphabets, no spaces allowed)
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(name.trim())) {
        throw new Error("Name must contain only alphabets with no spaces.");
    }

    return true;
};

export const validateAddressLine = (address: string): boolean => {
    if (typeof address !== "string" || address.trim().length === 0) {
        throw new Error("Address must be a non-empty string.");
    }
    // Check if the address has at least five characters
    if (address.trim().length < 5) {
        throw new Error("Address must be at least five characters long.");
    }
    // Regular expression to validate address lines (allowing alphanumeric characters, spaces, commas, and periods)
    const addressRegex = /^[a-zA-Z0-9\s,\.]+$/;

    if (!addressRegex.test(address.trim())) {
        throw new Error("Address must contain only alphanumeric characters, spaces, commas, or periods.");
    }
    return true;
};

export function validatePostalCode(postalCode: string): void {
    // Regex pattern for validating a 5-digit postal code (adjust based on your requirements)
    const postalCodeRegex = /^[0-9]{5}$/;

    // Check if the postal code matches the regex pattern
    if (!postalCodeRegex.test(postalCode)) {
        throw new Error("Invalid postal code format. Please provide a 5-digit code.");
    }

    // console.log("Postal code is valid");
}

export function validateCityOrLocality(city: string): void {
    // Regex pattern for city/locality names: 
    // Allows letters, spaces, apostrophes, hyphens, and periods. No numbers or special characters.
    const cityRegex = /^[A-Za-z\s'-.]+$/;

    // Check if the city name matches the regex pattern
    if (!cityRegex.test(city)) {
        throw new Error("Invalid city or locality name. It must only contain letters, spaces, apostrophes, hyphens, or periods.");
    }

    // console.log("City or locality name is valid");
}

export function validateEmail(email: string): void {
    // Regex pattern for a valid email address
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if the email matches the regex pattern
    if (!emailRegex.test(email)) {
        throw new Error("Invalid email address format.");
    }

    // console.log("Email address is valid.");
}

export function validatePhoneNumber(phone: string): void {
    // Remove spaces, dashes, or other non-digit characters except for the + symbol
    const cleanedPhone = phone.replace(/[^0-9+]/g, '');

    // Check if the cleaned phone number contains any alphabetic characters
    if (/[a-zA-Z]/.test(phone)) {
        throw new Error("Invalid phone number. Letters are not allowed.");
    }

    // Validate that the phone number starts with an optional + followed by a valid country code and 10-15 digits
    const phoneRegex = /^(?:\+?\d{1,3})?[-\s]?(\d{10,15})$/;

    // Check if it matches the expected phone number format
    if (!phoneRegex.test(cleanedPhone)) {
        throw new Error("Invalid phone number. It should start with a valid country code (optional) and contain 10 to 15 digits.");
    }

    // console.log("Phone number is valid.");
}

export const validatePassword = (password: string): boolean => {
    if (typeof password !== "string" || password.trim().length === 0) {
        throw new Error("Password must be a non-empty string.");
    }

    // Check if the password has at least eight characters
    if (password.length < 8) {
        throw new Error("Password must be at least eight characters long.");
    }

    // Regular expression to validate password strength
    // Must contain at least one uppercase letter and one lowercase letter
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!passwordRegex.test(password)) {
        throw new Error(
            "Password must include at least one uppercase letter and one lowercase letter."
        );
    }

    return true;
};

export const validateDOB = (dob: string): void => {
    const today = new Date();
    const birthDate = new Date(dob);

    if (isNaN(birthDate.getTime())) {
        throw new Error("Invalid date format. Use YYYY-MM-DD.");
    }

    const age = today.getFullYear() - birthDate.getFullYear();
    const isMonthBefore = today.getMonth() < birthDate.getMonth();
    const isDayBefore = today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate();

    if (age < 0 || (age === 0 && isMonthBefore)) {
        throw new Error("Date of birth cannot be in the future.");
    }

    if (age < 15 || (age === 15 && isMonthBefore) || (age === 15 && isDayBefore)) {
        throw new Error("You must be at least 15 years old.");
    }
};


export const sendDonationEmail = async (email: string, amount: number, appealTitle: string) => {
    // Simulate email delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock sending email
    console.log(`
    ---------------------------------------------------
    [MOCK EMAIL SERVICE] Sending Confirmation...
    To: ${email}
    Subject: Thank you for your donation of £${amount}
    
    Dear Donor,

    This is a confirmation of your generous donation of £${amount} to "${appealTitle}".
    
    May Allah reward you abundantly.
    
    Sincerely,
    Elia Relief Trust Team
    ---------------------------------------------------
    `);

    return { success: true };
};

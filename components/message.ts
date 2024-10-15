export async function sendMessage(message: string) {
    // Define chat ID here
    const chatId =  process.env.NEXT_PUBLIC_GROUP_ID; // Replace with your actual chat ID
  
    // Construct the API URL
    const apiUrl = `https://tgbotapi-rcpl.onrender.com/users/send-message?chatId=${chatId}&message=${encodeURIComponent(message)}`;
  
    try {
      // Make the GET request to the API
      const response = await fetch(apiUrl, {
        method: 'GET'
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      // Parse the JSON response (assuming the API returns JSON)
      const data = await response.json();
  
      //console.log('Message sent successfully:', data);
      return true;
    } catch (error) {
      //console.error('Failed to send message:', error);
      return false;
    }
  }
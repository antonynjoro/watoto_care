

// Format the date to "12 Oct (2 days ago)" format
function formatDate(dateCreated) {


    // Format the date to "12 Oct" format
    const formattedDate = dateCreated.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short'
    });
  
    // Calculate the difference in days
    const today = new Date();
    const timeDifference = today - dateCreated;
    const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    if (dayDifference === 0) {
      return `Today (${formattedDate})`
    }
  
    // Combine the formatted date and the difference in days
    return `${dayDifference }  days ago. (${formattedDate})`;

}

export default formatDate
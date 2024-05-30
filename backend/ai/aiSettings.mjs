// AI Instructions
export const instructions = `you are a stoner. use chat history to prevent duplicated responses. learn from chat history.`
// How many results to return
export const nResults = 5; 

export const options={
    temperature: 1,       //  0 = accurate  1 = creative  
    // top_K: 1,           //  ensures the generative AI prioritizes the most likely continuations 1 = considers only the single most probable token.  Max = Vocabulary size (considers all possible tokens)
    // top_p: 0.9,          //  Lowering P restricts the selection to a smaller set of high-probability
}

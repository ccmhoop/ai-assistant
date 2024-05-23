// AI Instructions
export const instructions = `You are a web assistant for an it company.`
// How many results to return
export const nResults = 5; 

export const options={
    temperature: 0.5,       //  0 = accurate  1 = creative  
    top_K: 1,           //  ensures the generative AI prioritizes the most likely continuations 1 = considers only the single most probable token.  Max = Vocabulary size (considers all possible tokens)
    top_p: 0.9,          //  Lowering P restricts the selection to a smaller set of high-probability
}

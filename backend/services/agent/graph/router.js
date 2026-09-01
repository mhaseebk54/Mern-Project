 export const router = async (req, res) => {
    const { prompt, aiResponse } = req.body;
    const state = agentState({ prompt, aiResponse });
    res.json(state);
}
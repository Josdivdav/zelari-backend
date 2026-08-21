


export const SignUp = async (req: any, res: any) => {
    try {
        const data = req.body;
        /* Process/Validate data then create or reject user */
        
        
        res.json(data);
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}

export const SignIn = async (req: any, res: any) => {
    res.json({ result: "Signed In"});
}  
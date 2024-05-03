const candidate= require("../model/candidateSchema");
const User = require("../model/user");

exports.registerCandidate= async(req, res)=>{
    try{
        const {name, party}= req.body;
        if(!name || !party){
            res. status(200).json({
                success:false,
                message:'Fill all  the data '
            })
        }

        const newCandidate = candidate.create({
            name:name,
            party:party,

        })
        console.log(newCandidate);
        return res. status(200).json({
            success:true,
            message:'Fill all  the data ',
            data:newCandidate
        })


    }catch(error){
        res.status(200).josn({
            success:false,
            message:" error in creating candidate Something went wwrong"
        })

    }
};

exports.voted=async(req, res)=>{
    try{
        console.log("aashirwad");
        const {userId}=req.body;
        let user = await User.findById({_id:userId});
        if(user.voted){
            return res.status(200).json({
                success:false,
                message:'Already voted'
            })
        }
        const {val}=req.body;
        const candidates = await candidate.findOne({_id:val});
        let vote = candidates.vote;

        vote= vote+1;
        candidates.vote=vote;
        user.voted=true;

        await candidates.save();
        await user.save();
        res.status(200).json({
            vote:vote,
            name:candidate.name
        })


    }catch(error){
        console.log(error.message);
        res.status(200).json({
            success:false,
            message:'error in voted section'
        })

    }
}

exports.getAllCandidate=async(req, res)=>{
    try{
        
        const candidates= await candidate.find({});
        // console.log(candidates);
        // console.log("hloo jii");
         res.status(200).json({
            success:true,
            candidates,
            message:"All candidates fetch successfully"
        });

    
    }
    catch(error){
        console.log(error.message);
        res.status(200).json({
            success:false,
            message:"error in geting all candidates "
        })
    }
}

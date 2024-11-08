import Notification from "../models/notification.model";

export const getNotifications = async(req,res) =>{
        try {
            const userId = req.user._id;

            const notifications = await Notification.find({to: userId}).populate({
                path:"from",
                select: "username profileImg",
            });

            await Notification.updateMany({to:userId}, {read : true});

            res.status(200).json({notifications})
        } catch (error) {
            console.log("Error in the getNotifications controller", error);
            res.send(500).json({error: "Internal server error"});
        }
}

export const deleteNotifications = async(req,res) =>{
    try {
        
        const userId = req.user._id;

        await Notification.deleteMany({to:userId});

        res.status(200).json({message: "Notification deleted successfully"});
    } catch (error) {
        console.log("Error in the deleteNotifications controller", error);
        res.send(500).json({error: "Internal server error"});
    }
}
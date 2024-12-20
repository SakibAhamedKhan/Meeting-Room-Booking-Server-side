import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import seedAdmin from "./DB";


async function main() {
    try {
        await mongoose.connect(config.db_url as string);

        seedAdmin();
        
        app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`);
          });
    } catch (error) {
        console.log(error);
    }
}

main();
import React from "react";
import AddPost from "../AddPost/index"
import Post from "../Post/index"


const HomePage = ()=>{
    return(
        <div>
            <h1>Home Page</h1>
            <AddPost />
            <Post />

        </div>
    )
}
export default HomePage
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Post = ({
    id,
    imgUrl,
    user,
    title,
    address,
    description,
    numberOfSignUps,
    comments,
}) => {
  return (
    <TouchableOpacity>
        <Image
        source={{
            uri: imgUrl,
        }}
        className="h-36 w-36 rounded-sm"
        >
        </Image>
    </TouchableOpacity>
  );
}

export default Post;
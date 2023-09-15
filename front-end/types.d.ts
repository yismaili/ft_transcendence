type User = {
    "id": number,
    "username": string,
    "firstName": string,
    "lastName": string,
    "email": string,
    "picture": string,
    "profile": {
        "id": number,
        "score": number,
        "los": number,
        "win": number,
        "xp": number,
        "level": number
    }
}
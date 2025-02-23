import React, { useState, createContext, useContext, Dispatch } from "react";

// =========  menuList
interface itemProps {
    id: number;
    user_id: number;
    ingredient_id: number;
    put_date: string;
    expire_date: string;
    custom_ingredient: string;
    ingredient_name: string;
}
const MenuListContext = createContext<itemProps[]>([]);
const MenuListDispatchContext = createContext<Dispatch<itemProps[]>>(Array);
export const MenuListContextProvider = ({ children }: any) => {
    const [menuList, setMenuList] = useState<itemProps[]>([]);

    return (
        <MenuListContext.Provider value={menuList}>
            <MenuListDispatchContext.Provider value={setMenuList}>
                {children}
            </MenuListDispatchContext.Provider>
        </MenuListContext.Provider>
    );
};

export const useMenuListContext = () => {
    const context = useContext(MenuListContext);
    return context;
};

export const useMenuListDispatchContext = () => {
    const context = useContext(MenuListDispatchContext);
    return context;
};
// =========  menuList
// =========  menuList
interface recipeProps {
    id: number;
    name: string;
    kcal: string | null;
    image_url: string;
    ingredients: string;
    likes: number;
    source_url: string;
}
const RecipeListContext = createContext<recipeProps[]>([]);
const RecipeListDispatchContext = createContext<Dispatch<recipeProps[]>>(Array);
export const RecipeListContextProvider = ({ children }: any) => {
    const [recipeList, setRecipeList] = useState<recipeProps[]>([]);

    return (
        <RecipeListContext.Provider value={recipeList}>
            <RecipeListDispatchContext.Provider value={setRecipeList}>
                {children}
            </RecipeListDispatchContext.Provider>
        </RecipeListContext.Provider>
    );
};

export const useRecipeListContext = () => {
    const context = useContext(RecipeListContext);
    return context;
};

export const useRecipeListDispatchContext = () => {
    const context = useContext(RecipeListDispatchContext);
    return context;
};
// =========  Diet Record
interface recordProps {
    id: number;
    user_id: number;
    put_date: string;
    recipe_id: number;
    recipe_name: string;
}
const DietRecordContext = createContext<recordProps[]>([]);
const DietRecordDispatchContext = createContext<Dispatch<recordProps[]>>(Array);

export const DietRecordContextProvider = ({ children }: any) => {
    const [dietRecords, setDietRecords] = useState<recordProps[]>([]);

    return (
        <DietRecordContext.Provider value={dietRecords}>
            <DietRecordDispatchContext.Provider value={setDietRecords}>
                {children}
            </DietRecordDispatchContext.Provider>
        </DietRecordContext.Provider>
    );
};

export const useDietRecordContext = () => {
    const context = useContext(DietRecordContext);
    return context;
};

export const useDietRecordDispatchContext = () => {
    const context = useContext(DietRecordDispatchContext);
    return context;
};
// =========  Diet Record
// =========  Liked Recipe
interface likedProps {
    recipe_id: number;
    id: number;
    user_id: number;
    score: number;
    name: string;
}
const LikedRecipeContext = createContext<likedProps[]>([]);
const LikedRecipeDispatchContext = createContext<Dispatch<likedProps[]>>(Array);

export const LikedRecipeContextProvider = ({ children }: any) => {
    const [likedRecipes, setLikedRecipes] = useState<likedProps[]>([]);

    return (
        <LikedRecipeContext.Provider value={likedRecipes}>
            <LikedRecipeDispatchContext.Provider value={setLikedRecipes}>
                {children}
            </LikedRecipeDispatchContext.Provider>
        </LikedRecipeContext.Provider>
    );
};

export const useLikedRecipeContext = () => {
    const context = useContext(LikedRecipeContext);
    return context;
};

export const useLikedRecipeDispatchContext = () => {
    const context = useContext(LikedRecipeDispatchContext);
    return context;
};
// =========  Liked Recipe
// =========  User Info
interface userInfoProps {
    id: number;
    user_id: string;
    height: number;
    weight: number;
    is_notified: number;
    notify_time: string;
    filepath: string;
}
const UserInfoContext = createContext<userInfoProps[]>([]);
const UserInfoDispatchContext = createContext<Dispatch<userInfoProps[]>>(Array);

export const UserInfoContextProvider = ({ children }: any) => {
    const [userInfo, setUserInfo] = useState<userInfoProps[]>([]);

    return (
        <UserInfoContext.Provider value={userInfo}>
            <UserInfoDispatchContext.Provider value={setUserInfo}>
                {children}
            </UserInfoDispatchContext.Provider>
        </UserInfoContext.Provider>
    );
};

export const useUserInfoContext = () => {
    const context = useContext(UserInfoContext);
    return context;
};

export const useUserInfoDispatchContext = () => {
    const context = useContext(UserInfoDispatchContext);
    return context;
};
// =========  User Info

import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import bcrypt from 'bcrypt';
import { user } from '$lib/server/db/schema';

export const POST = async ({ request }) => {
    try {
        const formData = await request.json();
        const { 
            username, 
            mcUsername, 
            discordTag, 
            password,
            baseX,
            baseY,
            baseZ 
        } = formData;
        
        if (!username || !password || !mcUsername || !discordTag) {
            return json({ 
                success: false, 
                message: 'Username, Minecraft username, Discord tag, and password are required.' 
            }, { status: 400 });
        }

        if (password.length < 8) {
            return json({
                success: false,
                message: 'Password must be at least 8 characters long.'
            }, { status: 400 });
        }

        const baseCoords = (baseX || baseY || baseZ) ? {
            x: parseInt(baseX) || 0,
            y: parseInt(baseY) || 0,
            z: parseInt(baseZ) || 0
        } : null;

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.insert(user).values({
            username,
            mcUsername,
            discordTag,
            password: hashedPassword,
            baseCoords, 
            trustScore: 50,
            isActive: true,
            lastLogin: new Date()
        });

        return json({ 
            success: true, 
            message: 'Welcome to SmartBank! Your account has been created successfully.' 
        });
    } catch (error) {
        console.error('Registration Error:', error);
        
        if (error.code === '23505') {
            const field = error.detail.includes('mc_username') 
                ? 'Minecraft username' 
                : 'Username';
            return json({ 
                success: false, 
                message: `${field} is already registered.` 
            }, { status: 400 });
        }

        // Generic error
        return json({ 
            success: false, 
            message: 'Registration failed. Please try again.' 
        }, { status: 500 });
    }
};

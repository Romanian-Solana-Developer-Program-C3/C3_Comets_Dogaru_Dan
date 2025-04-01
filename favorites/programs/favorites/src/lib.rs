use anchor_lang::prelude::*;


declare_id!("5kFkH5sh3zi37JBHAFUTr4XhoyTEp1JnzkqSzCzdja5r");

#[program]
pub mod favorites {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn set_favorites(ctx: Context<SetFavorites>, color: String, number: u64, hobbies: Vec<String>) -> Result<()> {
        msg!("Setting favorites");

        msg!("Program Id: {:?}", ctx.program_id);
        msg!("User: {:?}", ctx.accounts.user.key());
        msg!("Favorites: {:?}", ctx.accounts.favorites.key());
        msg!("Color: {:?}", color);
        msg!("Number: {:?}", number);
        msg!("Hobbies: {:?}", hobbies);

        ctx.accounts.favorites.set_inner(Favorites {
            color,
            number,
            hobbies,
        });
        Ok(())
    }

}

#[derive(Accounts)]
pub struct Initialize {}


#[derive(Accounts)]
pub struct SetFavorites<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        init,
        payer = user,
        space = 8 + Favorites::INIT_SPACE,
        seeds = [b"favorites", user.key().as_ref()],
        bump,
    )]
    pub favorites: Account<'info, Favorites>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct Favorites {
    #[max_len(50)]
    pub color: String,
    pub number: u64,
    #[max_len(5,50)]
    pub hobbies: Vec<String>,
}

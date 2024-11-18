-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Gilad Meirson>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE sp_InsertOrder
	-- Add the parameters for the stored procedure here
	@FirstName nvarchar(55),
    @LastName nvarchar(55),
    @Address nvarchar(55),
    @Email nvarchar(55),
    @TotalPrice int,
    @TotalQuantity int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	

    -- Insert statements for procedure here
	INSERT INTO Orders 
    (first_name, last_name, address, email, total_price, total_quantity)
    VALUES 
    (@FirstName, @LastName, @Address, @Email, @TotalPrice, @TotalQuantity)
	select SCOPE_IDENTITY() as 'Id'
END
GO

const { ethers } = require("hardhat");
const fs = require('fs');

async function main() {
  console.log("🚀 Starting Freelance contract deployment...");

  // Read USDT deployment info
  let usdtAddress;
  try {
    // const usdtDeployment = JSON.parse(fs.readFileSync('./deployments/USDT-deployment.json', 'utf8'));
    usdtAddress = "0x6aE731EbaC64f1E9c6A721eA2775028762830CF7"
    console.log("📋 Using USDT address:", usdtAddress);
  } catch (error) {
    console.error("❌ Could not read USDT deployment info. Please deploy USDT first.");
    console.error("   Run: npx hardhat run scripts/deploy-USDT.js --network u2uSolarisMainnet");
    process.exit(1);
  }

  // Get the contract factory
  const FreelanceGigEscrow = await ethers.getContractFactory("FreelanceGigEscrow");
  
  // Deploy the contract with USDT address
  console.log("📦 Deploying FreelanceGigEscrow contract...");
  const freelance = await FreelanceGigEscrow.deploy(usdtAddress);
  
  // Wait for deployment to complete
  await freelance.waitForDeployment();
  
  const freelanceAddress = await freelance.getAddress();
  
  console.log("✅ FreelanceGigEscrow deployed successfully!");
  console.log("📍 Contract Address:", freelanceAddress);
      console.log("🔗 Explorer URL:", `https://explorer.u2u.xyz/address/${freelanceAddress}`);
  
  // Verify the deployment
  const owner = await freelance.owner();
  const mockUSDT = await freelance.mockUSDT();
  const platformFee = await freelance.platformFeePercent();
  const stakingGracePeriod = await freelance.stakingGracePeriod();
  
  console.log("📋 Contract Details:");
  console.log("   Owner:", owner);
  console.log("   Mock USDT:", mockUSDT);
  console.log("   Platform Fee:", platformFee.toString(), "basis points");
  console.log("   Staking Grace Period:", stakingGracePeriod.toString(), "seconds");
  
  // Save the deployment info
  const deploymentInfo = {
    network: "u2uSolarisMainnet",
    chainId: 39,
    contractName: "FreelanceGigEscrow",
    address: freelanceAddress,
    constructorArgs: [usdtAddress],
    deployedAt: new Date().toISOString(),
    deployer: await ethers.provider.getSigner().getAddress(),
    mockUSDT: usdtAddress
  };
  
  fs.writeFileSync(
    './deployments/Freelance-deployment.json', 
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("💾 Deployment info saved to ./deployments/Freelance-deployment.json");
  
  return freelanceAddress;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });

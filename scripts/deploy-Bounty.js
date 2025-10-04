const { ethers } = require("hardhat");
const fs = require('fs');

async function main() {
  console.log("🚀 Starting Bounty contract deployment...");

  // Read USDT deployment info
  let usdtAddress;
  try {
    // const usdtDeployment = JSON.parse(fs.readFileSync('./deployments/USDT-deployment.json', 'utf8'));
    usdtAddress = "0x6aE731EbaC64f1E9c6A721eA2775028762830CF7";
    console.log("📋 Using USDT address:", usdtAddress);
  } catch (error) {
    console.error("❌ Could not read USDT deployment info. Please deploy USDT first.");
    console.error("   Run: npx hardhat run scripts/deploy-USDT.js --network u2uSolarisMainnet");
    process.exit(1);
  }

  // Get the contract factory
  const Allin1Bounty = await ethers.getContractFactory("Allin1Bounty");
  
  // Deploy the contract with USDT address
  console.log("📦 Deploying Allin1Bounty contract...");
  const bounty = await Allin1Bounty.deploy(usdtAddress);
  
  // Wait for deployment to complete
  await bounty.waitForDeployment();
  
  const bountyAddress = await bounty.getAddress();
  
  console.log("✅ Allin1Bounty deployed successfully!");
  console.log("📍 Contract Address:", bountyAddress);
      console.log("🔗 Explorer URL:", `https://explorer.u2u.xyz/address/${bountyAddress}`);
  
  // Verify the deployment
  const owner = await bounty.owner();
  const usdtToken = await bounty.usdtToken();
  
  console.log("📋 Contract Details:");
  console.log("   Owner:", owner);
  console.log("   USDT Token:", usdtToken);
  
  // Save the deployment info
  const deploymentInfo = {
    network: "u2uSolarisMainnet",
    chainId: 39,
    contractName: "Allin1Bounty",
    address: bountyAddress,
    constructorArgs: [usdtAddress],
    deployedAt: new Date().toISOString(),
    deployer: await ethers.provider.getSigner().getAddress(),
    usdtToken: usdtAddress
  };
  
  fs.writeFileSync(
    './deployments/Bounty-deployment.json', 
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("💾 Deployment info saved to ./deployments/Bounty-deployment.json");
  
  return bountyAddress;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });

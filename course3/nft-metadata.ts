import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl } from "@solana/web3.js";
import "dotenv/config";

const keypair = getKeypairFromEnvironment("SECRET_KEY");
const umi = createUmi(clusterApiUrl("devnet"), "confirmed");

const umiKeypair = umi.eddsa.createKeypairFromSecretKey(keypair.secretKey);
const signer = createSignerFromKeypair(umi, umiKeypair);

const IMAGE_URI = "https://devnet.irys.xyz/E6AGdmm6Z5vFA9sarqEurm2mEcH2Sg3t4CZvcRmCEoUu"

umi.use(irysUploader());
umi.use(signerIdentity(signer));

export async function uploadMetadata() {
    try {
        console.log("Uploading metadata...");
        const metadata = {
            name: "Superliga Fantasy",
            symbol: "SLF",
            description: "The owner of Superliga Fantasy - 1/1",
            image: IMAGE_URI,
            attributes: [
                {
                    trait_type: "Role", value: "CTO", 
                },
                {
                    trait_type: "Favourite Team", value: "FCSB",
                },
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: IMAGE_URI,
                    }
                ],
            },
        }

        const metadataUri = await umi.uploader.uploadJson(metadata);
        console.log(`Metadata uploaded to ${metadataUri}`);
        
    } catch (error) {
        
    }
}

uploadMetadata();
import React, { useState, useEffect } from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer>
            <div class="footer">
                <div class="footer-wrapper">
                    <ul class="lists"><h3>Know us Better</h3>
                        <li ><a href="#" class="links">About us</a></li>
                        <li ><a href="#" class="links">Affiliate Program</a></li>
                        <li ><a href="#" class="links">FAQ</a></li>
                        <li ><a href="#" class="links">Blogs</a></li>
                    </ul>
                    <ul class="lists"><h3>Help</h3>
                        <li ><a href="#" class="links">Contact us</a></li>
                        <li ><a href="#" class="links">Grievance Officer</a></li>
                        <li ><a href="#" class="links">Our Policies</a></li>
                        <li ><a href="#" class="links">Terms&Conditions</a></li>
                        <li ><a href="#" class="links">Terms of Services</a></li>
                    </ul>
                    <ul class="lists"><h3>Also  available on</h3>
                        <li ><a href="#" class="links">Nykaa</a></li>
                        <li ><a href="#" class="links">Amazon</a></li>
                        <li ><a href="#" class="links">Mynthra</a></li>
                        <li ><a href="#" class="links">FlipKart</a></li>
                        <li ><a href="#" class="links">Purple</a></li>
                    </ul>
                    <ul class="lists">
                        <h3>Follow us</h3>
                        <div class="media">
                            <li ><a href="#" class="links">Facebook</a></li>
                            <li ><a href="#" class="links">Instagram</a></li>
                            <li ><a href="#" class="links">Youtube</a></li>
                        </div>
                    </ul>
                </div>
                <h4 class="copyright">© 2026 Dot & Key Wellness Ltd. All Rights Reserved.</h4>

            </div>

        </footer>

    );
}

export default Footer;
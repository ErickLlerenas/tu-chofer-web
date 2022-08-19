import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
	return (
		<div className="empty">
			<FontAwesomeIcon icon={faFolderOpen} className="empty-icon" />
			<br />
			<h2 className="center">Parece que esta página no existe...</h2>
		</div>
	);
}

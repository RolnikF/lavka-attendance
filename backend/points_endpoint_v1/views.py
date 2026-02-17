import logging

from fastapi import APIRouter, Depends, HTTPException, status

from backend.attendance import EmailCodeRequiredError
from backend.dependencies import init_data
from backend.utils_helper import db

logger = logging.getLogger(__name__)

from .crud import _getter_pr

router = APIRouter(prefix="/api", tags=["Point"])


@router.get("/get_points")
async def get_us_point(tg_userid=Depends(init_data)):
    """
    Получает баллы пользователя.

    Args:
        tg_userid: Telegram ID пользователя из зависимости init_data

    Returns:
        Баллы пользователя

    Raises:
        HTTPException: При ошибке получения баллов (статус 500)
    """
    try:
        await db.connect()

        res = await _getter_pr(db, tg_userid)
        return res

    except EmailCodeRequiredError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email code required",
        )
    except Exception as e:
        logger.error(f"Error getting points for user {tg_userid}: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve points",
        )

    finally:
        await db.disconnect()

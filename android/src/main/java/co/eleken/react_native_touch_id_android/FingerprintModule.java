package co.eleken.react_native_touch_id_android;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.hardware.fingerprint.FingerprintManager;
import android.os.Build;
import android.support.v4.app.ActivityCompat;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.github.ajalt.reprint.core.AuthenticationFailureReason;
import com.github.ajalt.reprint.core.AuthenticationListener;
import com.github.ajalt.reprint.core.Reprint;

/**
 * Created by Eleken. on 16.03.17.
 */

public class FingerprintModule extends ReactContextBaseJavaModule {
    
    
    private WritableMap response;
    
    private final ReactApplicationContext mReactContext;
    
    FingerprintModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }
    
    @Override
    public String getName() {
        return "Fingerprint";
    }
    
    @ReactMethod
    public void requestTouch(final Promise promise) {
        
        response = Arguments.createMap();
        if (!isSensorAvailable()) {
            sendResponse("failed", "Finger sensor is not available", promise);
            return;
        }
        
        Activity currentActivity = getCurrentActivity();
        
        if (currentActivity == null) {
            sendResponse("failed", "Can't find current Activity", promise);
            return;
        }
        
        Reprint.authenticate(new AuthenticationListener() {
            @Override
            public void onSuccess(int moduleTag) {
                sendResponse("ok", null, promise);
            }
            @Override
            public void onFailure(final AuthenticationFailureReason failureReason, final boolean fatal,
                                  final CharSequence errorMessage, int moduleTag, int errorCode) {
                
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                    if(failureReason == AuthenticationFailureReason.LOCKED_OUT) {
                        final Thread t = new Thread(new Runnable() {
                            public void run() {
                                try {
                                    sendResponse("failed", "LOCKED_OUT", promise);
                                } catch (Exception e) {
                                    Log.d("exceptionLog", errorMessage.toString());
                                }
                            }
                        });
                        t.start();
                    } else {
                        sendResponse("failed", errorMessage.toString(), promise);
                    }
                }
            }
        });
    }
    
    @ReactMethod
    public void dismiss() {
        Reprint.cancelAuthentication();
    }
    
    
    @ReactMethod
    public void isSensorAvailable(final Promise promise) {
        
        response = Arguments.createMap();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (ActivityCompat.checkSelfPermission(mReactContext, Manifest.permission.USE_FINGERPRINT) != PackageManager.PERMISSION_GRANTED) {
                sendResponse("failed", "You haven't allow this app to use your fingerprint sensor", promise);
                return;
            }
            
            if (mReactContext.getPackageManager().hasSystemFeature(PackageManager.FEATURE_FINGERPRINT) ||
                ((FingerprintManager) mReactContext.getSystemService(Context.FINGERPRINT_SERVICE)).isHardwareDetected()) {
                if (((FingerprintManager) mReactContext.getSystemService(Context.FINGERPRINT_SERVICE)).hasEnrolledFingerprints()) {
                    sendResponse("ok", null, promise);
                } else {
                    sendResponse("failed", "You have fingerprint sensor, but you should set it enabled in your settings to use with this app", promise);
                }
            } else {
                sendResponse("failed", "You don\'t have appropriate hardware", promise);
            }
        } else {
            sendResponse("failed", "You don\'t have appropriate hardware", promise);
        }
    }
    
    private boolean isSensorAvailable() {
        if (ActivityCompat.checkSelfPermission(mReactContext, Manifest.permission.USE_FINGERPRINT) != PackageManager.PERMISSION_GRANTED) {
            return false;
        }
        return Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && (mReactContext.getPackageManager().hasSystemFeature(PackageManager.FEATURE_FINGERPRINT) || ((FingerprintManager) mReactContext.getSystemService(Context.FINGERPRINT_SERVICE)).isHardwareDetected());
    }
    
    private void sendResponse(String status, String message, Promise promise) {
        Reprint.cancelAuthentication();
        response = Arguments.createMap();
        response.putString("status", status);
        response.putString("error", message);
        promise.resolve(response);
    }
}
